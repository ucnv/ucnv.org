system "echo '' > cmd.txt"
r = ('0'..'9').to_a + ('A'..'Z').to_a + ('a'..'z').to_a
99.times do |i|
  t = r.shuffle.first
  s = r.shuffle[0, rand(4)].join
  g = ['', 'g'].shuffle.first
  cmd = "sed s/%s/%s/%s Lenna-mozjpeg.jpg > Lenna-mozjpeg-glitched-%02d.jpg" % [t, s, g, i + 1]
  system("echo '%s' >> cmd.txt" % cmd)
  system cmd
end
