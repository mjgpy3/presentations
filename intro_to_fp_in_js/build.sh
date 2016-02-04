#!/bin/bash

printf "`head -n 24 presentation.html.tmpl`\n\n`cat presentation.mkd``tail presentation.html.tmpl`\n" > presentation.mkd.html
