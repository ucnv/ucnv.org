require 'nokogiri'
n = Nokogiri.parse(open('map.html').read)
n.css('.desc').each do |d|
  has_cat = true
  cat_name = ''
  case d.parent.attr('class')
  when /jpeg-s?rgb/
    cat_name = 'JPEG sRGB'
  when /jpeg-cmyk/
    cat_name = 'JPEG CMYK'
  when /jpeg-progressive/
    cat_name = 'JPEG Progressive'
  when /png-none-interlaced/
    cat_name = 'PNG None Interlaced'
  when /png-sub-interlaced/
    cat_name = 'PNG Sub Interlaced'
  when /png-up-interlaced/
    cat_name = 'PNG Up Interlaced'
  when /png-average-interlaced/
    cat_name = 'PNG Average Interlaced'
  when /png-peath-interlaced/
    cat_name = 'PNG Peath Interlaced'
  when /png-none/
    cat_name = 'PNG None'
  when /png-sub/
    cat_name = 'PNG Sub'
  when /png-up/
    cat_name = 'PNG Up'
  when /png-average/
    cat_name = 'PNG Average'
  when /png-peath/
    cat_name = 'PNG Peath'
  when /png-noinflate/
    cat_name = 'PNG without Deflate'
  when /gif-interlaced/
    cat_name = 'GIF Interlaced'
  when /tif-nocomp/
    cat_name = 'TIF No Compression'
  when /tif-jpeg/
    cat_name = 'TIF JPEG'
  when /tif-lzw/
    cat_name = 'TIF LZW'
  when /tif-zip/
    cat_name = 'TIF ZIP'

  else
    has_cat = false
  end

  if has_cat
    dt = Nokogiri::XML::Node.new('dt', n)
    dt['class'] = 'category'
    dt.content = 'Category'
    dd = Nokogiri::XML::Node.new('dd', n)
    dd['class'] = 'category'
    dd.content = cat_name
    d.css('.format').first.before dt
    d.css('.format').first.before dd
  else
    dt = d.css('.format').first
    dt['class'] = dt['class'] + ' category'
    dt.content = 'Category / File format:'
  end
end

open('map0.html', 'w') do |w|
  w.write n.to_xhtml(indent: 2)
end



