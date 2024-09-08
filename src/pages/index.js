import * as React from "react"
import { graphql, navigate } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      {/*<Bio />*/}
      <div className="grid md:grid-cols-2 grid-cols-1 justify-items-stretch gap-x-2 gap-y-2">
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <article
              key={post.fields.slug}
              className="border border-zinc-800 dark:border-zinc-200 rounded-2xl px-4 py-2"
              itemScope
              itemType="http://schema.org/Article"
              onClick={() => navigate(post.fields.slug)}
            >
              <header className="dark:text-gray-400 text-sm">
                <h2 className="text-xl font-extrabold">
                  <span itemProp="headline">{title}</span>
                </h2>
                <div className="flex justify-between">
                  <small>{post.frontmatter.date}</small>
                  <small>{post.frontmatter.category}</small>
                </div>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: post.frontmatter.description || post.excerpt
                  }}
                  itemProp="description"
                />
              </section>
            </article>
          )
        })}
      </div>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } },
      filter: { frontmatter: {draft : {ne : true}}}) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          category
          draft
        }
      }
    }
  }
`
