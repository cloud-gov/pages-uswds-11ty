---
layout: layouts/page
title: Offerings
permalink: /offerings/
eleventyNavigation:
  key: Offerings
  order: 1
hero:
  image: assets/img/hero-offerings.jpg
  heading: OFFERINGS
---

GSA is working to create human-centered, sustainable, flexible, and tech-enabled workspaces that provide great value for taxpayers and empower federal agencies to meet their missions better than ever before. Our offerings bring new tools and services to you.

<ul>
  {% for offering in collections.offerings %}
    <li><a href="{{ offering.url }}">{{ offering.data.title }}</a></li>
  {% endfor %}
</ul>
