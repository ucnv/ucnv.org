['light', 'dark'].each do |x|
  b = open(x + '.obj').read.b
  b.gsub! /5\./ do
    rand(15).to_s + '.'
  end
  open(x + '-g.obj', 'w') do |f|
    f.write b
  end
end
