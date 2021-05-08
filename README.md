# Codingame Sprint Challenge 2021

Url: https://www.codingame.com/contests/spring-challenge-2021  
Starter Pack: https://github.com/CodinGame/SpringChallenge2021/tree/main/starterAIs 


## Note:  

### Ligue Bois 2  
Je récupère tout les arbres qui sont à moi  Puis je les tri par `richness`, les arbres qui sont au centre seront `COMPLETE`
en priorité car ils rapportent plus de points

### Ligue Bois 1  
Nouvelle règles:  
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

