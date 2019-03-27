import { getIconForTag } from "../lib/tag-icons";
import { TagSearchBox } from "./TagSearchBox";
import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import { getTagsQuery } from "../queries/getTags";

export interface BannerProps {
  tag: string;
  onSelectTag: (tag: string) => void;
}

export function Banner(props: BannerProps) {
  const { tag, onSelectTag } = props;
  const icon = getIconForTag(tag);
  const prefix = icon ? icon.prefix || "fab" : "";
  const tagElement = icon ? (
    <i
      className={`${prefix} fa-${icon.icon}`}
      style={icon.color ? { color: icon.color } : {}}
    />
  ) : null;

  let [showSearchBar, setShowSearchBar] = React.useState(false);

  if (!tag) {
    showSearchBar = true;
  }

  const bannerHeader = tag ? (
    <div className="banner-header" onClick={() => setShowSearchBar(true)}>
      {tagElement}
      <span className="banner-title">Remote {tag} jobs</span>
    </div>
  ) : null;

  const tagSearch = (
    <ApolloConsumer>
      {client => {
        const getTags = async (text: string) => {
          const queryResult = await client.query({
            query: getTagsQuery,
            variables: { text }
          });
          return queryResult.data.getTags;
        };
        return (
          <TagSearchBox
            getTags={getTags}
            initialValue={tag}
            onSelectTag={onSelectTag}
          />
        );
      }}
    </ApolloConsumer>
  );

  return (
    <div className="banner">
      {!showSearchBar && bannerHeader}
      {showSearchBar && tagSearch}
    </div>
  );
}