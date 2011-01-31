!SLIDE

# enter: [sbt](http://code.google.com/p/simple-build-tool/)

* a **simple(r)** build tool
* a **scala** build tool
* a **sexy** build tool

!SLIDE

of the **scala**, by the **scala**, for the **scala**

![sbt scala](sbt/xsbtgh.png)

!SLIDE

Guy in the back exclaims...

!SLIDE

Wait!!! What about my IDE???

!SLIDE

![eclipse](sbt/eclipse.png)

!SLIDE

# There is no **e** in **sbt**

use what you like

!SLIDE

Relax

It's **★** Editor Independence Day! **★**

![usa](sbt/america.jpg)

!SLIDE

# cereal box prizes

* project management
* dependency managment
* bendy
* it's **tiny** by default
* all from a friggin' **REPL**!

!SLIDE

# project managment

sbt is built with sbt. How cool is that?

!SLIDE

# adoption

    > mkdir -p fooz/src/{main,test}/{scala,resources}

    > mkdir -p fooz/{project,src/{main,test}/{scala,resources}}

!SLIDE
    > tree # or
    > ls -R | grep ":$" | sed -e 's/:$//' \
    -e 's/[^-][^\/]*\//--/g' -e 's/^/   /' -e 's/-/|/'
    |-project # <-- your sbt project config lives here
    |-src
    |---main
    |-----resources
    |-----scala
    |---test
    |-----resources
    |-----scala

!SLIDE

    > cat `which sbt`
    java -Xmx512M -jar `dirname $0`/sbt-launch-0.7.4.jar "$@"

!SLIDE

# toe dip

    > sbt
    Project does not exist, create new project? (y/N/s) y
    Name: fooz
    Organization: nyscala
    Version [1.0]: 0.0.1
    scala version [2.7.7]: 2.8.0
    sbt version [0.7.4]:
    ... getting stuff
    [info] Building project fooz 0.0.1 against Scala 2.8.0
    [info]    using sbt.DefaultProject with sbt 0.7.4
      and Scala 2.7.7
    > exec find src/main/scala -iname *.scala -exec wc -l {} ;

!SLIDE
    > tree | head -14
    |-lib
    |-project
    |---boot
    |-----scala-2.7.7
    |-------lib
    |-------org.scala-tools.sbt # sbt power
    |---------sbt
    |-----------0.7.4
    |-------------compiler-interface-bin_2.7.7.final
    |-------------compiler-interface-bin_2.8.0.RC2
    |-------------compiler-interface-src
    |-------------xsbti
    |-----scala-2.8.0
    |-------lib

!SLIDE

    > {editor} project/build/Project.scala

    import sbt._

    /** Sbt will evaluate this as the project's configuration */
    class Fooz(info: ProjectInfo) extends DefaultProject {
      // override defaults
      // declare dependencies
      // conjure spells!
    }

!SLIDE

# save points

    > cat project/build.properties
    #Project properties
    #Sat Jan 29 20:16:24 EST 2011
    project.organization=nyscala
    project.name=fooz
    sbt.version=0.7.4
    project.version=0.0.1
    build.scala.versions=2.8.0
    project.initialize=false

!SLIDE

    lazy val projectOrganization = propertyOptional[String](name, true)
    lazy val projectName = propertyLocalF[String](NonEmptyStringFormat)
    lazy val sbtVersion = property[String]
    lazy val projectVersion = property[Version]
    lazy val defScalaVersion = property[String]
    lazy val buildScalaVersions = propertyOptional[String](
      defScalaVersion.value, true)


!SLIDE

# dependency management

!SLIDE
    > ls lib_managed | wc -l
    0

    > sbt update

    > ls lib_managed | wc -l
    {n}

!SLIDE

# **ivy** and or **maven**
(but _mostly_ ivy)

!SLIDE

# **%%** and **%**
##  and other business

!SLIDE

    // fixed scala version
    val a = "org.a" % "a_2.7.7" % "1.0"

    // cross built (a good citizen)
    val b = "org.b" %% "a" % "1.0"

    // java/maven
    val jc = "org.jc" % "jc" % "1.0"

    // jar from where evs
    val d = "d" % "d" % "2.1" from "http://somehost.com/2.1/d.jar"

!SLIDE

## phone out, phone home
    val x = "repo name" at "path"

    val scalaToolsSnapshots =
      "Scala-Tools Maven2 Snapshots Repository" at
        "http://scala-tools.org/repo-snapshots"

    val m2 = "Local M2" at
      "file://%s/.m2/repository" format Path.userHome

!SLIDE

# publishing

    > cat /project/build/Project.scala
    import sbt._

    class Project(info: ProjectInfo)
      extends DefaultProject(info) {
      override def managedStyle = ManagedStyle.Maven
      val publishTo = "Repoz" at "http://you.com/repos/releases/"
      Credentials(Path.userHome / ".ivy2" / ".credentials", log)
    }

    > sbt +publish

!SLIDE

 thank you for being a friend

    > cat project/build.properties | grep versions
    build.scala.versions 2.8.1 2.8.0 2.7.7

    > sbt +update
    > sbt +compile
    > sbt +publish

!SLIDE

# think global,
publish **local**

    > sbt +publish-local # publish your project to a local cache

    > mvn -o # maven's offline mode

!SLIDE

# tasks

speak louder than words

!SLIDE

# discovery
list actions

    > sbt actions

    > rake -T # rake's task:description listing

!SLIDE

# **watch** it mister!
continuous execution

    > sbt ~test

!SLIDE

**teach sbt** to speak

    lazy val say = task { args =>
      args match {
        case Array() => task { Some("say what?") }
        case _ => task {
          new java.lang.ProcessBuilder(("say" :: args.toList).toArray:_*).start
          None
        }
      }
    } describedAs("chatty")

speak sbt, speak!

    sbt 'say i am in your codez'

!SLIDE

# plugins
**sharing** is caring

!SLIDE

make

    > cat project/build/ChattyProject.scala
    import sbt._

    class ChattyProject(info: ProjectInfo) extends PluginProject(info)


    > cat src/main/scala/Chatty.scala
    package nyscala

    import sbt._

    trait Chatty extends Project {
     lazy val say = task { ... }
    }

!SLIDE

take

    > cat project/plugins/Plugins.scala
    import sbt._

    class Plugins(info: ProjectInfo) extends PluginDefinition(info) {
      val repo = "repoz" at  "http://host.com/repos"
      val chatty = "nyscala" % "chatty" % "1.0.0"
    }

    > cat project/build/Project.scala
    import sbt._

    class Fooz(info: ProjectInfo)
      extends DefaultProject(info)
      with nyscala.Chatty {
      // you can now make sbt speak
    }


!SLIDE

# fin

    > sbt update run

!SLIDE

# sbt

* [code.google.com/p/simple-build-tool/wiki/Setup](http://code.google.com/p/simple-build-tool/wiki/Setup)
* [groups.google.com/group/simple-build-tool](http://groups.google.com/group/simple-build-tool)
* [github.com/harrah/xsbt](https://github.com/harrah/xsbt)

!SLIDE

# editors
for the guy in the  back

* [github.com/frank06/sbt-eclipse-plugin](https://github.com/frank06/sbt-eclipse-plugin)
* [github.com/mpeltonen/sbt-idea](https://github.com/mpeltonen/sbt-idea)
* [ikennaokpala.wordpress.com/2010/09/11/sbt-on-netbeans/](http://ikennaokpala.wordpress.com/2010/09/11/sbt-on-netbeans/)
* [github.com/stevej/emacs/blob/master/support/sbt.el](https://github.com/stevej/emacs/blob/master/support/sbt.el)
