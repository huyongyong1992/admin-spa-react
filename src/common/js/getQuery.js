export default function getQuery(key) {
  const location = window.location;
  const query = {};

  location.search.slice(1).split('&').forEach((item) => {
    const queryPair = item.split('=');
    query[queryPair[0]] = queryPair[1];
  });

  const rst = query[key];

  return rst ? window.decodeURIComponent(query[key]) : '';
}
