---
layout: layouts/media-index
title: Media Gallery
permalink: "/media{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber }}{% endif %}/index.html"
sidenav: false
eleventyNavigation:
  key: media
  parent: home
  title: Media Gallery
  order: 4
  hideChildrenFromTopNav: true
pagination:
  data: collections.media
  size: 10
  alias: posts
  reverse: true
---
{%- assign media_count = 0 -%}
{%- for post in posts -%}
  {%- if post.url -%}
    {%- assign media_count = media_count | plus: 1 -%}
  {%- endif -%}
{%- endfor -%}

{%- if media_count > 0 -%}
  <div class="margin-top-2">
    <ul class="usa-card-group grid-row grid-gap">
      {%- for post in posts reversed -%}
        {%- if post.url -%}
          <li class="usa-card tablet:grid-col-6">
            <div class="usa-card__container height-full">
              <div class="usa-card__img">
                <a class="display-block" href="{{ post.url }}">
                  {%- if post.data.thumbnail -%}
                    <img
                      src="{{ post.data.thumbnail }}"
                      alt="{{ post.data.thumbnail_alt | default: post.data.title }}"
                      class="width-full"
                      loading="lazy"
                    >
                  {%- else -%}
                    <div class="bg-base-lightest padding-4 text-center">
                      <span class="font-sans-sm text-base-dark">Thumbnail unavailable</span>
                    </div>
                  {%- endif -%}
                </a>
              </div>
              <div class="usa-card__body">
                <h2 class="usa-card__heading margin-top-0">
                  <a class="usa-link" href="{{ post.url }}">{{ post.data.title }}</a>
                </h2>
                {%- assign teaser = post.data.description
                  | default: post.templateContent
                  | strip_html
                  | truncatewords: 24
                -%}
                <p class="usa-card__description">{{ teaser }}</p>
              </div>
              <div class="usa-card__footer">
                <a class="usa-button usa-button--outline width-full" href="{{ post.url }}"> View video </a>
              </div>
            </div>
          </li>
        {%- endif -%}
      {%- endfor -%}
    </ul>
  </div>
{%- else -%}
  <div class="usa-alert usa-alert--info" role="status">
    <div class="usa-alert__body">
      <h3 class="usa-alert__heading">Media coming soon</h3>
      <p class="usa-alert__text">We’ll publish new videos here as they become available.</p>
    </div>
  </div>
{%- endif -%}
