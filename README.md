# Vue 3

- [Google Forms](https://docs.google.com/forms/d/e/1FAIpQLSdKvDkCfEVAaJWeEpFALiBZ_mOr2nqYng5idHStyBYlhwxNLw/viewform?usp=preview)
- [Démos](./0-demos/)
- [Ateliers](./1-ateliers/)
- [Correction des ateliers](./1-ateliers/corrections/)

---

## Documentation

### Installations et lancement

- [Quick Start](https://vuejs.org/guide/quick-start.html#creating-a-vue-application)
- [Vite and Vue](https://stackblitz.com/edit/vitejs-vite-xxsomp?file=index.html)
- [Creating a Vue Application](https://vuejs.org/guide/essentials/application.html)
- [Vue Devtools](https://devtools.vuejs.org/)
- [Vue VSCODE Extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

### Vue core

- [Props](https://vuejs.org/guide/components/props.html)
- [ref](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#declaring-reactive-state-1)
- [reactive](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#reactive)
- [Computed Properties](https://vuejs.org/guide/essentials/computed.html)
- [Composition API FAQ](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Event Handling](https://vuejs.org/guide/essentials/event-handling.html)
- [Form input bindings](https://vuejs.org/guide/essentials/forms.html)
- [Provide / Inject](https://vuejs.org/guide/components/provide-inject.html)

### Cycle de vie

- [Lifecycle Hooks](https://vuejs.org/guide/essentials/lifecycle.html)
- [LyfeCycle](https://vuejs.org/guide/essentials/lifecycle)
- [LyfeCycle Composition API](https://vuejs.org/api/composition-api-lifecycle.html#composition-api-lifecycle-hooks)

### Composants

- [Components Basics](https://vuejs.org/guide/essentials/component-basics.html)
- [SFC](https://vuejs.org/guide/scaling-up/sfc.html)
- [Template](https://vuejs.org/guide/essentials/template-syntax.html)

### Routes et router

- [Vue router](https://router.vuejs.org/guide/)
- [Nested routes](https://router.vuejs.org/guide/essentials/nested-routes.html)

## Style CSS

- [Classes et styles CSS](https://vuejs.org/guide/essentials/class-and-style)

---

## Pinia

- [Extensions de Pinia via la création de ses propres plugins](https://pinia.vuejs.org/core-concepts/plugins.html)
- [Tests unitaires](https://pinia.vuejs.org/cookbook/testing.html#Unit-testing-components)
- [Complément](https://masteringpinia.com/?utm_campaign=VueRouter_MP&utm_content=sidebar&utm_medium=vuerouter&utm_source=affiliate)

---

## Bonnes pratiques

- [Guide](https://v3.ru.vuejs.org/style-guide/#rule-categories)

---

## Compléments hors programme 


- [Async Component](https://vuejs.org/guide/components/async.html#basic-usage)
- [Plugin](https://vuejs.org/guide/reusability/plugins.html)
- [VueUse](https://vueuse.org/)
- [Nuxt](https://nuxt.com/)
- [Vuetify](https://vuetifyjs.com/en/)
- [Lazy Loading](https://router.vuejs.org/guide/advanced/lazy-loading.html#lazy-loading-routes)
- [Vue avec TypeScript](https://fr.vuejs.org/guide/typescript/overview)


---

## Librairies front-end avec des composants prêt à l'emploi

- [vuetify ](https://vuetifyjs.com/en/)
- [Boostrap vue](https://bootstrap-vue.org/docs)
- [Element.io](https://element.eleme.io/#/fr-FR/component/installation)

---

## Les opérations possibles à effectuer par chronologie sur chaque hook du cycle de vie de Vue


1. **Initialisation (setup):**
Exécuté de manière synchrone avant même que le composant ne soit créé (remplace `beforeCreate` et `created`).

* **Opérations possibles (vous le faites déjà sans le savoir):** 

- Déclarer l'état réactif (`ref`, `reactive`)
- Configurer les propriétés calculées (`computed`)
- Créer des observateurs (`watch`)
- Définir les fonctions ou méthodes du composant.


2. **Avant le montage (onBeforeMount):**
Appelé juste avant que le rendu initial ne soit inséré dans le DOM.

* **Opérations possibles :** 

- Effectuer de dernières modifications sur l'état juste avant l'affichage

3. **Après le montage (onMounted):**
Appelé lorsque le composant est inséré dans le DOM et que ses éléments sont accessibles.

* **Opérations possibles :** 

- Interagir directement avec le DOM
- Initialiser des bibliothèques tierces nécessitant un accès au DOM (par exemple Chart.js ou Leaflet pour les graphes et une carte)
- Lancer des requêtes réseau (appels API) pour récupérer les données initiales, et ajouter des écouteurs d'événements globaux (`window.addEventListener`).


4. **Avant la mise à jour (onBeforeUpdate):**
Appelé lorsqu'un état réactif change, juste avant que le DOM ne soit mis à jour.

* **Opérations possibles :** 
- Lire l'état actuel du DOM avant qu'il ne soit modifié par le nouveau rendu (par exemple, enregistrer manuellement la position actuelle de défilement ou l'état de focus d'un élément).


5. **Après la mise à jour (onUpdated):**
Appelé après que le DOM a été mis à jour suite à un changement de données.

* **Opérations possibles :**
- Effectuer des opérations dépendant du DOM après un re-rendu. *Attention : ne modifiez pas l'état réactif ici, sous peine de déclencher une boucle infinie de rendus.*


6. **Avant le démontage (onBeforeUnmount):**
Appelé juste avant qu'un composant ne soit détruit et retiré du DOM (le composant est encore entièrement fonctionnel).

* **Opérations possibles :** 
C'est le hook principal pour le nettoyage.
- Il faut y annuler les requêtes réseau en cours (`AbortController`)
- Supprimer les écouteurs d'événements globaux
- Effacer les timers (`clearInterval` ou `clearTimeout`) pour éviter les fuites de mémoire.


7. **Après le démontage (onUnmounted):**
Appelé une fois que le composant a été entièrement retiré et détruit.

* **Opérations possibles :** 

- Effectuer de dernières vérifications de déconnexion de services ou de nettoyage global si le composant n'existe plus du tout.

