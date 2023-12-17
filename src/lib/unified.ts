import CustomImage from '@/components/CustomImage';
import CustomLink from '@/components/CustomLink';
import { getOpenGraph } from '@/lib/openGraph';
import probe from 'probe-image-size';
import React from 'react';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';
import rehypeReact from 'rehype-react';
import remarkBreaks from 'remark-breaks';
import remarkEmoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

import type { CustomLinkProps } from '@/components/CustomLink';
import type { Options } from 'rehype-react';
import type { Root } from 'rehype-react/lib';
import type { Plugin } from 'unified';

/**
 * A rehype plugin to add height and width to each image element in hast
 */
const rehypeImageSize: Plugin<void[], Root> = () => {
  return async (root) => {
    const promises: (() => Promise<void>)[] = [];

    visit(root, 'element', (node) => {
      if (node.tagName !== 'img' || typeof node?.properties?.src !== 'string') {
        return;
      }

      promises.push(async () => {
        const properties = node.properties as {
          src: string;
          height: number;
          width: number;
        };
        const { height, width } = await probe(properties.src);

        properties.height = height;
        properties.width = width;
      });
    });

    await Promise.all(promises.map((promise) => promise()));
  };
};

/**
 * A rehype plugin to add meta of Open Graph to each anchor element in hast
 */
const rehypeOpenGraph: Plugin<void[], Root> = () => {
  return async (root) => {
    const promises: (() => Promise<void>)[] = [];

    visit(root, 'element', (node, index, parent) => {
      if (
        node.tagName === 'a' &&
        node.position?.start.column === 1 &&
        index !== null &&
        parent !== null
      ) {
        const nextSibling = parent.children[index + 1];
        if (
          // make sure that an anchor element is not an inline link.
          nextSibling === undefined ||
          (nextSibling.type === 'element' && nextSibling.tagName === 'br')
        ) {
          promises.push(async () => {
            // deceive TypeScript to pass additional properties.
            const properties = node.properties as CustomLinkProps;
            const { href } = properties;
            const { url, description, image, title } = await getOpenGraph(href);

            // I don't know why, but property names will be lowercase after being parsed by unified.
            // do not use lower camel-case like "openGraph" for property names. it will be broken.
            properties.url = url;
            properties.description = description;
            properties.image = image;
            properties.title = title;
          });
        }
      }
    });

    await Promise.all(promises.map((promise) => promise()));
  };
};

/**
 * A function to transform an article body into a well-formatted ReactElement
 */
export const processContent = async (
  content: string,
): Promise<React.ReactElement> => {
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkBreaks)
    .use(remarkEmoji)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeImageSize)
    .use(rehypeOpenGraph)
    .use(rehypeCodeTitles)
    .use(rehypePrism)
    .use(rehypeReact, {
      createElement: React.createElement,
      Fragment: React.Fragment,
      components: {
        a: CustomLink,
        img: CustomImage,
      },
      // add type assertion to avoid a type error caused by rehype-react.
    } as unknown as Options)
    .process(content);

  return processedContent.result;
};
