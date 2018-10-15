# -*- coding: utf-8 -*-…

import json
import datetime

inputfile = open('pubs.json', 'r', encoding='utf8')
data = json.load(inputfile)
for d in data:
    del(d['id'])
    del(d['name'])
    del(d['lastModif_date'])
    d['cover'] = d['cover_path']
    del(d['cover_path'])
    d['document'] = d['destination_uri']
    del(d['destination_uri'])
    date = d['date'].split(' ')[0].split('-')
    del(d['date'])
    d['date'] = dict()
    d['date']['full'] = "{}/{}/{}".format(date[2], date[1], date[0])
    d['date']['year'] = date[0]
    d['id'] = d['link_title'].replace(' ', '-').replace('\t', '-').replace(':', '').replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u').replace('ñ', 'n').lower()

outputfile = open('pubs_out.json', 'wb')
outputfile.write(json.dumps(data, indent=4, sort_keys=True, ensure_ascii=False).encode('utf8'))
