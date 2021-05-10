# Codingame Sprint Challenge 2021

Url: https://www.codingame.com/contests/spring-challenge-2021  
Starter Pack: https://github.com/CodinGame/SpringChallenge2021/tree/main/starterAIs 


## Note:  

### Ligue Bois 2  
Je récupère tout les arbres qui sont à moi puis je les tri par `richness`, les arbres qui sont au centre seront `COMPLETE`
en priorité car ils rapportent plus de points

### Ligue Bois 1  
Nouvelles règles:  
- Les arbres ont des tailles différentes (taille 1, 2 et 3)  
- Faire `GROW` un arbre ca coute:  
	- Pour un arbre de taille `1` => `3` points de soleil + le nombre d'arbre de taille `2`  
	- Pour un arbre de taille `2` => `7` points de soleil + le nombre d'arbre de taille `3`  

Nouvelles idées:  
> Idée 1:
>- `COMPLETE` tout les arbres de taille `3`  
>- Pour chaque arbre de taille `2`:  
>	- Le faire `GROW`  
>	- Le `COMPLETE` directement  
>- Quand il n'y a plus d'arbre de taille `2`, faire la même chose pour tout les tailles `1`

> Idée 2:
>- Calculer la `valeur` d'un arbre, c'est à dire combien il me rapport de point en fonction de combien je vais dépenser pour lui
>- Classer tout mes arbres par leur `valeur` et `développer` le plus `rentable`
>- Puis passer au suivant

### Ligue Bronze
Nouvelles règles:
 - Un arbre peut être de taille ``0``, c'est à dire une ``graine``
 - Un sol peut avoir une ``richness`` à ``0``, c'est à dire être ``inutilisable``
 - Chaque arbre projette une ombre:
	- Cela dépend de la ``direction`` du soleil
	- La ``direction`` du soleil => ``day modulo 6``
	- Un arbre de taille ``1`` projette de l'ombre sur ``1`` case
	- Un arbre de taille ``2`` projette de l'ombre sur ``2`` case
	- Un arbre de taille ``3`` projette de l'ombre sur ``3`` case 
	- :warning: Une ombre est ``menaçante`` si elle est projettée sur un arbre de ``même taille`` ou ``plus petit``
 - Les points soleil:
	- Un arbre, qui n'est pas menaçé, de taille ``0`` rapport ``0 point``
	- Un arbre, qui n'est pas menaçé, de taille ``1`` rapport ``1 point``
	- Un arbre, qui n'est pas menaçé, de taille ``2`` rapport ``2 point``
	- Un arbre, qui n'est pas menaçé, de taille ``3`` rapport ``3 point``
 - Action: ``SEED`` lance une graine de ``1 à 'taille de l'arbre'`` case
 - Un arbre qui à réalisé une action ``s'endort`` pour le ``reste du jour``
 - Pour planter une ``SEED`` cela coute le ``nombre de graine que j'ai``
 - Je ne peux pas planter sur une case ``inutilisable``
 - Une graine lancé est ``endormie``
 - Faire `GROW` un arbre ca coute:  
	- Pour un arbre de taille ``0`` => ``1`` points de soleil + le nombre d'arbre de taille ``1`` 
 - Pour cette ligue il y a ``24 jours``