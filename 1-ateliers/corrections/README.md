# Commentaires ateliers

## 1.1 à 1.4

### Convention nommage Composant

- PascalCase ( 1ère lettre majuscule et  1ère lettre de chaque mot en MAJ) et au moins deux mots

### Généralités

#### Options API

Avec Options API, tout est dans un objet anonyme
```javascript
export default {
    components: {
        HelloWorld,
        TheWelcome
    },
    props: {
        msg: String,
        question: String,
        response: String
    },
    data() {
        return {

        }
    }
}
```
- Les composants enfants doivent être importés puis déclarés dans `components`
- Les props permettent de définir la structure des données extérieurs provenant du composant parent
- data() {} contient les données réactives cad des données dont la mise à jour de l'information force la mise à jour du DOM partout ou la donnée a été utilisée

#### Composition API

Avec la Composition API, la programmation est plus naturelle en JS
- Identifiant par l'attribut setup `<script setup></script`
- Pas besoin de déclarer les composants enfants
- La fonction `defineProps()` est globale et permet de définir la structure des données fournis par le parent (ie props en Options API)
- ref() est l'équivalent de data() {} dans la Composition API

---
