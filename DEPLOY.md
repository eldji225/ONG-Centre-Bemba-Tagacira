# Déploiement Vercel — ONG Centre Bemba Tagaçira

## Méthode rapide (2 minutes)

### 1. Créer un compte Vercel
- Aller sur https://vercel.com
- S'inscrire avec GitHub, GitLab ou un email

### 2. Pousser le projet sur GitHub
```bash
# Initialiser Git (si pas encore fait)
git init
git add .
git commit -m "ONG Centre Bemba Tagaçira - site v1"

# Créer un repo sur github.com puis :
git remote add origin https://github.com/VOTRE-USER/centre-bemba-tagacira.git
git push -u origin main
```

### 3. Déployer sur Vercel
- Sur vercel.com, cliquer **"Add New Project"**
- Sélectionner le repo GitHub `centre-bemba-tagacira`
- Vercel détecte Next.js automatiquement
- Cliquer **"Deploy"**
- Attendre ~60 secondes → le site est en ligne !

### 4. Connecter le domaine (optionnel)
- Dans les paramètres du projet Vercel → **Domains**
- Ajouter `centrebembatagarira.org`
- Mettre à jour les DNS chez votre registraire :
  - Type `A` → `76.76.21.21`
  - Type `CNAME` → `cname.vercel-dns.com`

---

## Méthode alternative (sans GitHub)

Si vous n'avez pas GitHub, vous pouvez utiliser le CLI Vercel :

```bash
# Installer le CLI Vercel
npm install -g vercel

# Se connecter
vercel login

# Déployer (depuis le dossier du projet)
vercel

# Pour la production
vercel --prod
```

---

## Variables d'environnement

Aucune variable critique n'est nécessaire pour le déploiement initial.
Le site fonctionne tel quel avec un simple `vercel --prod`.

Si vous ajoutez plus tard un backend (formulaires, base de données) :
- Dans Vercel → Settings → Environment Variables
- Ajouter les variables nécessaires

---

## URL obtenue

Après déploiement, vous recevrez une URL du type :
`ong-centre-bemba-tagacira.vercel.app`

Vous pourrez ensuite la remplacer par votre domaine personnalisé.
