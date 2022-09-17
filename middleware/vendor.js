/* A middleware that checks if the user is a vendor. If not, it redirects to the profile page. */
export default function ({ store, redirect }) {
  if (!store.getters['auth/isVendor']) {
    return redirect('/profile/preferences')
  }
}
