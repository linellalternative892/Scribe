const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require("remark-gfm")],
    rehypePlugins: [require("rehype-slug"), require("rehype-autolink-headings")],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [],
  },
  reactStrictMode: true,
  // Silence workspace-root detection warning in monorepo environments
  outputFileTracingRoot: __dirname,
};

module.exports = withMDX(nextConfig);
