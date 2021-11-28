import * as React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import { LocalizedLink as Link } from "gatsby-theme-i18n";

import Layout from "../../../components/layout";
import { MDXRenderer } from "gatsby-plugin-mdx";
import DiscordPostCard from "../../../components/discodPost";

// todo: facelift

const StyledFilterWrapper = styled.div`
  display: flex;
  justify-content: end;
  border-bottom: 1px solid #44aa92;
  padding-bottom: 1em;

  div {
    text-decoration: none;
    border: 1px solid #44aa92;
    padding: 0.1em 0.3em;
    color: #44aa92;
    margin-right: 0.5em;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const TypeFilter = ({ types, onClick }) => {
  return (
    <StyledFilterWrapper>
      {types.map(({ type, isSelected }) => (
        <div
          key={`post-type-${type}`}
          onClick={() => onClick({ type })}
          style={{
            color: isSelected ? "green" : "grey",
            opacity: isSelected ? "1" : "0.6",
            borderColor: isSelected ? "#44aa92" : "grey",
          }}
        >
          #{type}
        </div>
      ))}
    </StyledFilterWrapper>
  );
};

class PostsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
      posts: [],
    };
  }

  onClickType = ({ type }) => {
    const findTypeAndToggle = this.state.types.map((t) => {
      if (t.type === type) {
        return {
          ...t,
          isSelected: !t.isSelected,
        };
      }
      return t;
    });

    this.setState({
      types: findTypeAndToggle,
    });
  };

  componentDidMount() {
    const types = [
      ...new Set(
        this.props.data.allFile.nodes.map((node) => {
          const [_, type] = node.childMdx.frontmatter.slug.split("/");
          return type;
        })
      ),
    ].map((type) => ({
      type,
      isSelected: true,
    }));

    const posts = this.props.data.allFile.nodes.map((node) => {
      const [_, type] = node.childMdx.frontmatter.slug.split("/");
      return {
        ...node,
        type,
      };
    });

    this.setState({
      types,
      posts,
    });
  }

  render() {
    const { ...rest } = this.props;
    const { posts, types } = this.state;

    const selectedTypes = types
      .filter((type) => type.isSelected)
      .map((type) => type.type);

    const postsWithSelectedTags = posts.filter((post) => {
      return selectedTypes.includes(post.type);
    });

    return (
      <Layout pageTitle="Translated Content" {...rest}>
        {types && <TypeFilter types={types} onClick={this.onClickType} />}
        {postsWithSelectedTags &&
          postsWithSelectedTags.map((node, key) => (
            <DiscordPostCard
              key={`announcement-${node.childMdx.frontmatter.slug}`}
              {...node.childMdx}
            />
          ))}
      </Layout>
    );
  }
}

export const query = graphql`
  query ($locale: String!) {
    allFile(
      filter: {
        sourceInstanceName: { eq: "discord" }
        childMdx: { fields: { locale: { eq: $locale } } }
      }
      sort: { fields: childMdx___frontmatter___date, order: DESC }
    ) {
      nodes {
        childMdx {
          frontmatter {
            title
            date(formatString: "MMMM D, YYYY")
            slug
            postedBy
            originalPost
            translatedBy
          }
          body
          timeToRead
        }
      }
    }
  }
`;

export default PostsPage;
