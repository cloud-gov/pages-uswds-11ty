---
permalink: /
layout: layouts/wide
title: Home
eleventyNavigation:
  key: home
  title: Home
hero:
  title: Hero callout
  url: /
  body: >
    Support the callout with some short explanatory text. You don’t need more than a couple of sentences.
  buttontext: Call to action
topics:
  - title: Default flag
    url: /
    img: https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg
    alt: A placeholder image
    body: Lorem ipsum dolor sit amet consectetur adipisicing elit.
    buttontext: Visit Florida Keys
  - title: Default flag
    url: /
    img: https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg
    alt: A placeholder image
    body: Lorem ipsum dolor sit amet consectetur adipisicing elit.
    buttontext: Visit Florida Keys
  - title: Default flag
    url: /
    img: https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg
    alt: A placeholder image
    body: Lorem ipsum dolor sit amet consectetur adipisicing elit.
    buttontext: Visit Florida Keys
  - title: Default flag
    url: /
    img: https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg
    alt: A placeholder image
    body: Lorem ipsum dolor sit amet consectetur adipisicing elit.
    buttontext: Visit Florida Keys
---

{% include 'hero.html', hero: hero %}
{% include 'highlights.html', topics: topics %}
