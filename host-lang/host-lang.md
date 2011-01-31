!SLIDE

# What can a jvm built system learn from a **rubist**?

!SLIDE

# What **if**?

`echo "Makefile" | sed 's/Make/Rake/'`

!SLIDE

# **happiness** is
# right in front of you

![jim](host-lang/jim-weirich.jpg)

`rake -T # ruby developer happiness ensues`

!SLIDE

> Programmers often feel joy when they can **concentrate on** the **creative** side of **programming**, so Ruby is designed to **make programmers happy**.

&mdash; Yukihiro “Matz” Matsumoto

!SLIDE

![buildr](host-lang/buildr.png)[apache buildr](http://buildr.apache.org/) caught on

* a build system using executable code
* java/scala aware
* but...

!SLIDE

# why build **Scala** projects with **Ruby**?

!SLIDE

![clojure](host-lang/clojure-icon.gif) [leiningen](https://github.com/technomancy/leiningen/blob/master/README.md#readme) gets it

    (defproject leiningen "0.5.0-SNAPSHOT"
      :description "A build tool designed to not set your hair on fire."
      :url "http://github.com/technomancy/leiningen"
      :dependencies [[org.clojure/clojure "1.1.0"]
                 [org.clojure/clojure-contrib "1.1.0"]]
      :dev-dependencies [[swank-clojure "1.2.1"]])

**clojure** on **clojure** action ^

!SLIDE

# Notice a theme?
