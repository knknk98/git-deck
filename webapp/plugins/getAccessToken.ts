import { Plugin } from '@nuxt/types'
import firebase from 'firebase'

const getAccessTokenPlugin: Plugin = async ({ $accessor }) => {
  const result = await firebase.auth().getRedirectResult()
  // @ts-ignore
  const accessToken =
    (result.credential as firebase.auth.OAuthCredential | null)?.accessToken ??
    null
  $accessor.auth.setGithubAccessToken(accessToken as string | null)
}

export default getAccessTokenPlugin
