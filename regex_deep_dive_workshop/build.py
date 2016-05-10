#!/usr/bin/env python

with open('presentation.html.tmpl', 'r') as f:
  html = f.readlines()

with open('presentation.mkd', 'r') as f:
  markdown = f.read()

with open('presentation.mkd.html', 'w') as f:
  f.write('\n'.join(html[:24]) + '\n\n' + markdown + '\n'.join(html[-10:]))
