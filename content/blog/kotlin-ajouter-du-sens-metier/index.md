---
title: "[Kotlin] Les Value Classes"
date: "2024-07-22"
description: "Ajouter du sens métier avec les Value Classes"
category: "kotlin"
---
L'idée de ce premier article sur Kotlin m'est venue avec un cas concret en Java que j'ai croisé récemement. Une des qualités de Kotlin sur Java est l'expérience développeur améliorée en donnant la possibilité d'éclaircir le code d'un point de vue domaine métier (notamment avec des DSL - Domaine Specific Language).

## La problématique

Dans le cas qui nous concerne ici, regardons ensemble cette méthode Java :

```java
boolean checkBicIban(String iban, String bic);
```

Elle est pour moi une bombe à retardement :

1. Le nom porte à confusion sur l'ordre des paramètres : bic / iban ou iban / bic !?
2. Rien ne ressemble plus une String qu'une autre String, aucune aide à attendre du compilateur pour respecter l'ordre des paramètres !

## Paramètres nommés

En Kotlin, le compilateur est notre ami. La première option que nous offre Kotlin depuis de nombreuses années, c'est d'appeler les méthodes en nommant les paramètres.

Attention : cela ne fonctionne que pour les méthodes Kotlin, pas Java.

À partir de maintenant, imaginons donc que cette méthode a été écrite en Kotlin …

```kotlin
checkBicIban(bic = "GB15HBUK40127612345678", iban="HBUKGB4B"):Boolean
```

Encore une fois cette possibilité est optionnelle, et pour une fonction à 2 paramètres, je n'utilise généralement pas les paramètres nommés.

## Et les Value Classes dans tout ça !?

J'y viens … nous pouvons en effet aller un cran plus loin et être encore plus explicite, et verrouiller la fonction avec des types spécifiques. Vous me voyez venir, l'idée n'est pas compliquée. Nous allons créer des classes CodeIban et CodeBic pour wrapper les codes IBAN et BIC.

En Java, wrapper des types primitifs dans des classes est généralement une mauvaise idée au niveau des performances mémoire car on remplit inutilement l'espace mémoire heap.

Les Value Classes sont une fonctionnalité assez récente de Kotlin permettant d'écrire des classes wrapper, mais dont la valeur sera unwrapped à la compilation. On parle aussi de classes inline (à noter que pour la JVM, l'annotation @JvmInline est requis).

Par exemple :

```kotlin
@JvmInline
value class CodeIban(val code: String)
```

Désormais, impossible de se tromper d'argument avec une signature de fonction comme celle-ci, le compilateur ne nous laissera pas faire. Cette fois sans utiliser de paramètres nommés, mais avec un typage fort :

```kotlin
fun checkBicIban(iban:CodeIban, bic: CodeBic):Boolean
[...]
checkBicIban(CodeIban("GB15HBUK40127612345678"), CodeBic("HBUKGB4B"))
```

La forme équivalente en Java après décompilation du bytecode nous donne bien des paramètres unwrapped String :
public static final boolean checkBicIban(@NotNull String iban, @NotNull String bic);

## Conclusion

Les Value Classes nous permettent de typer les types primitifs avec un sens métier et ainsi éviter certaines erreurs.
Attention toutefois à ne pas confondre avec une autre fonctionnalité de Kotlin, l'aliasing.

```kotlin
typealias Point = Pair<Int,Int>
```

Cette fois il s'agit juste d'une réécriture de types, très pratique pour des types génériques à rallonge ! Ici `Point` et `Pair<Int,Int>` sont synonymes et parfaitement interchangeables. Rien ne nous interdira de passer des paramètres de type `Pair<Int, Int>` à la fonction `fun drawLine(p1:Point,p2:Point)` et inversement.

Attention aussi à ne pas entrer dans l'utilisation excessive des Value Classes. Wrapper tous les types primitifs de son modèle métier est selon moi contre-productif !

