/**
 * Add image to main Images.
 * @param state
 * @param product
 */
export function addMainImage(state, row) {
  const mainProductNames = [
    'FRONT',
    'INSIDE',
    'OUTSIDE',
    'BACK',
    'TOP',
    'FOOTBED STICHING',
    'SIZE TAG',
    'INSOLE (TOP)',
    'INSOLE (BOTTOM)',
    'BOTTOM',
    'BOX LABEL',
  ]
  if (mainProductNames.includes(row.currentSelectionName)) {
    const indexOfMainProducts = state.mainImages.findIndex(
      (el) => el.name === row.currentSelectionName
    )
    state.mainImages[indexOfMainProducts].border =
      'col2 populated-items-heat pull-left'
    state.mainImages[indexOfMainProducts].image = row.image
  } else {
    const indexAdditionalProduct = state.additionalImages.findIndex(
      (el) => el.name === row.currentSelectionName
    )
    state.additionalImages[indexAdditionalProduct].image = row.image
  }
  const imageRow = {
    name: row.currentSelectionName,
    url: row.image,
    id: row.id ?? 0,
  }
  state.selectedImages.push(imageRow)
}

/**
 * Update Error Class
 * @param state
 * @param rows
 */
export function updateErrorClass(state, rows) {
  state.mainImages = rows
}

/**
 * update status
 * @param state
 * @param processCheckout
 */
export function updateCheckoutStatus(state, processCheckout) {
  state.processCheckout = processCheckout
}

/**
 * update sku
 * @param state
 * @param sku
 */
export function updateSku(state, sku) {
  state.sku = sku
}

/**
 * Remove the all images and set default.
 * @param state
 * @param product
 */
export function resetData(state, row) {
  state.mainImages = [
    {
      name: 'FRONT',
      image:
        'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/front.svg',
      border: 'col2 populated-items-heat pull-left',
    },
    {
      name: 'INSIDE',
      image:
        'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/inside.svg',
      border: 'col2 populated-items-heat pull-left',
    },
    {
      name: 'OUTSIDE',
      image:
        'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/out.svg',
      border: 'col2 populated-items-heat pull-left',
    },
    {
      name: 'BACK',
      image:
        'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/back.svg',
      border: 'col2 populated-items-heat pull-left',
    },
    {
      name: 'TOP',
      image:
        'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/top.svg',
      border: 'col2 populated-items-heat pull-left',
    },
    {
      name: 'FOOTBED STICHING',
      image:
        'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/footbed.svg',
      border: 'col2 populated-items-heat pull-left',
    },
    {
      name: 'SIZE TAG',
      image:
        'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/size-tag.svg',
      border: 'col2 populated-items-heat pull-left',
    },
    {
      name: 'INSOLE (TOP)',
      image:
        'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/insoles-top.svg',
      border: 'col2 populated-items-heat pull-left',
    },
    {
      name: 'INSOLE (BOTTOM)',
      image:
        'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/insole-bottom.svg',
      border: 'col2 populated-items-heat pull-left',
    },
    {
      name: 'BOTTOM',
      image:
        'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/bottom.svg',
      border: 'col2 populated-items-heat pull-left',
    },
    {
      name: 'BOX LABEL',
      image:
        'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/box-label.svg',
      border: 'col2 populated-items-heat pull-left',
    },
  ]
  state.additionalImages = [
    {
      name: 'DATE STAMP',
      image:
        'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/datestamp.svg',
    },
    {
      name: 'SHOE INSERT',
      image:
        'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/shoe-insert.svg',
    },
    {
      name: 'LACE BAGS',
      image:
        'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/lace-bag.svg',
    },
    {
      name: 'HANG TAGS',
      image:
        'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/hangtag.svg',
    },
    {
      name: 'MISC',
      image:
        'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/mice.svg',
    },
  ]
  state.selectedImages = []
  state.sku = ''
}
