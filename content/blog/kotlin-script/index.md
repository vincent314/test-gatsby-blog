---
title: Kotlin Script
date: "2024-08-30"
description: "Scripter les taches quotidiennes avec Kotlin"
category: "kotlin"
---
Kotlin est un langage facile à apprendre pour les développeurs Java. Nous avons tous nos préférences, mais il est rapidement devenu mon langage #1, un langage à tout faire.

Il est particulièrement connu pour le développement Android, un peu moins pour le développement sur la JVM où il remplace avantageusement Java. Avec [Kotlin Multiplatform](https://kotlinlang.org/docs/multiplatform.html), nous pouvons développer, avec le même langage et en réutilisant le même code base, des applications Android, iOS, JVM, Javascript, WASM et même en natif !

Et si je vous disais qu'il est aussi possible d'écrire des **scripts** avec Kotlin ?

## Comment scripter au quotidien ?

Pour automatiser les taches au quotidien, nous pouvons utiliser le shell, Python, NodeJS ou tout autre langage interprété et rapide à mettre en place. Utiliser des languages compilés comme Java ou C, ça devient beaucoup plus long et fastidieux, car il faut initialiser tout un projet (Maven, Gradle, Makefile…).

### Shell

Utiliser le shell (bash, zsh, fish, nushell…) est une solution très pratique et efficace, mais :

* un nouveau langage à apprendre
* difficile à vraiment maitriser si on ne l'utilise pas quotidiennement
* il manque le typage au langage
* les paquets de dépendances doivent être pré-installés
* la portabilité n'est pas assurée entre Linux, MacOS et PowerShell

J'ai découvert récemment [nushell](https://www.nushell.sh/) ❤️ qui mérite un article à lui tout seul.

### Python

Python est certainement un excellent langage et un super ecosystème, mais en tant que développeur Java/Kotlin, je n'ai jamais eu ni le besoin, ni l'occasion de m'y mettre sérieusement.

### NodeJS

En tant que développeur frontend, NodeJS est une solution interessante d'automatisation. L'avantage, c'est qu'on maîtrise déjà le Javascript. L'inconvénient, c'est du Javascript … De plus, dès qu'une dépendance est nécessaire, il faut initialiser un projet NPM pour définir dans le fichier `package.json` les dépendances. Notre script `.js` n'est plus auto-suffisant.

## Kotlin script

Comme pour Java, j'avais l'habitude de créer des mini-projets Gradle/Kotlin pour des petites taches d'automatisation. L'inconvénient, c'est que ça exige de compiler puis exécuter le projet avec un peu de configuration Gradle ou Maven. 

La fonctionnalité de [script Kotlin](https://kotlinlang.org/docs/custom-script-deps-tutorial.html) est encore **expérimentale**, mais elle existe bien dans le compilateur `kotlinc`, avec le support dans Intellij. Voici quelques règles :

* l'extension des fichiers scripts est `.kts`
* le fichier `main` doit se nommer `*.main.kts`
* déjà possible dans un fichier source Kotlin, tout peut être déclaré dans un seul fichier script (classes, fonctions, enum, interfaces, objects …). Mais que cela ne vous empêche pas de dispatcher dans d'autres fichiers annexes (cf. `@file:Import`)
* Pas besoin de fonction `main`, vous écrivez directement les instructions dans le fichier `*.main.kts`. À noter la valeur `args:String[]` contient les paramètres d'appel.

### Les avantages

* nous bénéficions de toute la puissance de Kotlin (typage fort, null safety, [POO](https://fr.wikipedia.org/wiki/Programmation_orient%C3%A9e_objet) …)
* nous bénéficions des avantages de la JVM (rapidité d'exécution du bytecode, carbage-collector, …)
* nous bénéficions des écosystèmes de Java et de Kotlin
* un fichier auto-suffisant
* portable
* aucune dépendance/module/plugin à installer au préablable

### Les inconvénients

* nécessite [l'installation du compilateur](https://kotlinlang.org/docs/command-line.html)
* démarrage plus long (compilation, téléchargement des dépendances et démarrage de la JVM)
* chamboulle un peu notre manière de coder : c'est plus compliqué pour du [TDD](https://fr.wikipedia.org/wiki/Test_driven_development)
* encore en phase expérimentale

### Exemples

Un exemple simple pour commencer : `hello.main.kts`
```kotlin
#!/usr/local/bin/kotlinc -script
val name = args.first()
println("Hello, $name")
```

L'écosystème Java/Kotlin offre des fonctionnalités très puissantes dont nous sommes déjà habitués et qu'on aimerait bien utiliser dans nos scripts.

En en-tête de fichier, avec l'annotation `@file:DependsOn` nous pouvons déclarer des dépendances à la manière de Gradle. Par exemple :

```kotlin
@file:DependsOn("org.jetbrains.kotlinx:dataframe:0.14.0-dev-3771")

import org.jetbrains.kotlinx.dataframe.DataFrame
import org.jetbrains.kotlinx.dataframe.api.print
import org.jetbrains.kotlinx.dataframe.io.read

DataFrame.read("test.csv").print()
```

Comme avec Gradle, nous pouvons définir un autre repository (cf. `@file:Repository`). Il est pour l'instant impossible d'appliquer des plugins Gradle, pour par exemple utiliser la librairie de sérialization [kotlinx.serialization](https://kotlinlang.org/docs/serialization.html).

## Intégration dans les projets

Kotlin scripting va plus loin en offrant la possibilité d'[exécuter des scripts au runtime](https://kotlinlang.org/docs/custom-script-deps-tutorial.html#create-a-scripting-host) de nos applications, par exemple pour faire du live-coding graphique avec [OPENRNDR](https://openrndr.org/) !

En Java nous avions par exemple [Rhino](http://mozilla.github.io/rhino/) pour exécuter du JavaScript dans un runtime Java. Mais pouvoir définir des [DSL](https://kotlinlang.org/docs/type-safe-builders.html) (Domain-Specific Language) avec Kotlin, donne la main à des acteurs métiers pour écrire des fonctionnalités à nos applications !

## Conclusion

Kotlin est en évolution constante et n'arrête pas de me suprendre du point de vue de l'expérience développeur. Le mot qui le caractériserait le mieux selon moi est **pragmatisme**. En tant que développeur quelles sont les fonctionalités qui me sont utiles et faciles à mettre en œuvre ? Kotlin vient implémenter des réponses à cette question.

Scripter des actions en Kotlin dans l'environnement JVM n'a jamais été aussi simple avec **Kotlin Script**. L'auto-suffisance de ces fichiers et donc la facilité de partage en font un outil puissant dans un context de travail collaboratif.
