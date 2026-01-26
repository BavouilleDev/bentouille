# Émojis Discord

Système similaire à `react-apple-emojis` mais pour les émojis Discord.

## Utilisation

Le système utilise un `DiscordEmojiProvider` et un composant `DiscordEmoji`, similaire à `react-apple-emojis`.

```tsx
import DiscordEmoji from '@/components/DiscordEmoji';

<DiscordEmoji name="smiling_imp" size={20} fallback="😈" />
```

## Fichiers nécessaires :

Placez les fichiers PNG dans ce dossier (`public/emojis/`) :

- `smiling_imp.png` - Pour 😈 (Discord)
- `tv.png` - Pour 📺 (Twitch)
- `camera.png` - Pour 📷 (Instagram)
- `fire.png` - Pour 🔥 (Reddit)
- `movie_camera.png` - Pour 🎬 (Header)
- `art.png` - Pour 🎨 (Header)
- `star.png` - Pour ⭐ (Header)

## Où trouver les émojis Discord :

1. **Discord Emoji CDN** : `https://cdn.discordapp.com/emojis/[emoji_id].png`
   - Pour utiliser directement le CDN, modifiez `src/data/discordEmojis.ts`
2. **Discord Emoji Websites** : 
   - https://discordemoji.com/
   - https://emojipedia.org/discord/
3. **Depuis Discord** : Clic droit sur un émoji → Copier le lien de l'image

## Format recommandé :

- Format : PNG avec transparence
- Taille : 32x32px ou 64x64px (sera redimensionné automatiquement)
- Nom du fichier : Utilisez les noms exacts définis dans `src/data/discordEmojis.ts`

## Utilisation du CDN Discord directement :

Vous pouvez aussi utiliser les URLs Discord directement dans `src/data/discordEmojis.ts` :

```ts
export const discordEmojiData = {
  'smiling_imp': 'https://cdn.discordapp.com/emojis/1234567890.png',
  // ...
};
```
