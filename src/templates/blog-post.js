import React from 'react';
import Layout from '../components/layout';
import { graphql, Link } from 'gatsby'
import HomeLink from '../components/home-link';

function BlogPost(props) {

    const post = props.data.markdownRemark;
    const { title } = post.frontmatter;

    return (
        <Layout>
            <div className="blog-container">
                <HomeLink />
                <div className="blog-index-button">
                    <Link to="/blog">
                        <h2>Back</h2>
                    </Link>
                </div>
                <div>
                    <h1>{title}</h1>
                    <div className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />
                </div>
            </div>
        </Layout>
    )
}


export default BlogPost;

export const query = graphql`

 query PostQuery($slug: String!) {
     markdownRemark(fields: { slug: { eq: $slug } }) {
       html
       frontmatter {
        title
        description
       }
   }
}`