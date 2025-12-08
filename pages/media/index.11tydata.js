export default function (data) {
  return {
    pagination: {
      data: "collections.media",
      size: 10,
      alias: "posts",
      reverse: true,
      before: (items) => (items && items.length ? items : ["media-placeholder"]),
    },
  };
}
