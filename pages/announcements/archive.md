---
layout: layouts/default
pagination:
  data: collections.postsByYear
  size: 1
  alias: year
  addAllPagesToCollections: true
eleventyComputed:
  title: "Announcements: {{ year[0] }}"
  permalink: "announcements/{{ year[0] | slug }}/"
  eleventyNavigation:
    key: announcements-{{year[0]}}
    parent: announcements
    title: "{{ year[0] }}"
---

<ul class="usa-collection">
  {%- for post in year[1] | reverse -%}
    {%- include 'collection-item.html', post: post -%}
  {%- endfor -%}
</ul>
