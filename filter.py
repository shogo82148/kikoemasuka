#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
タブ区切りのテキストから(聞こえてますか・・・)っぽいものを抽出するスクリプト

Usage:
python filter.py < tweets.tsv > corpus.txt
"""

import codecs
import sys
import re

sys.stdin = codecs.getreader('utf-8')(sys.stdin)
sys.stdout = codecs.getwriter('utf-8')(sys.stdout)

_kikoemasuka = re.compile(u'[(（](.+)[)）]')
_dots = re.compile(ur'\.\.+|．．+|・・+|…+')

def convert(s):
    m = _kikoemasuka.search(s)
    if not m:
        return None
    s = m.group(1)
    a = _dots.split(s)
    a = [i for i in a if i]
    if len(a) < 2:
        return None
    return " ".join(a)

def main():
    s = set()
    for line in sys.stdin:
        a = line.split('\t')
        result = convert(a[0])
        if result and result not in s:
            s.add(result)
            print result

if __name__ == "__main__":
  main()

