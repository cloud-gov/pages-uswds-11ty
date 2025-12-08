---
title: Search results
layout: layouts/search
permalink: /search/
sidenav: false
---

{% if site.searchgov %}

  <ol id="search-results"></ol>
{% else %}
  <script>
    window.location = "/";
  </script>
{% endif %}
