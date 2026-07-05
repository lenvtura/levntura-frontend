import type { Block } from 'payload'

/**
 * AddressList — mirrors `app/contact/address.tsx`.
 *
 * Intro paragraph + grid of office cards (each: 3-letter code, full
 * address, phone numbers, directions link, social icons).
 */
export const AddressListBlock: Block = {
  slug: 'addressList',
  labels: { singular: 'Address List', plural: 'Address Lists' },
  fields: [
    {
      name: 'intro',
      type: 'textarea',
      localized: true,
      defaultValue:
        "At Levntura, we're here to guide you every step of the way on your journey of discovery. Whether you have questions about our programs, want to share feedback, or simply want to say hello, we'd love to hear from you. Get in touch with us using any of the following methods:",
    },
    {
      name: 'offices',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Office', plural: 'Offices' },
      defaultValue: [
        {
          code: 'AMM',
          address:
            'Address: Mecca st, Buld 145, office 408, Amman Jordan, 11185',
          phones: [{ number: '+962 79 082 2202' }, { number: '+962 79 092 2202' }],
          directionsLabel: 'DIRECTIONS',
          directionsURL:
            'https://maps.google.com/?q=Mecca+st+145+Amman+Jordan',
        },
        {
          code: 'CAI',
          address:
            'Address: 3 Skies Plaza, S 90th st, New Cairo, Egypt, 11835',
          phones: [{ number: '+20 150 0050391' }, { number: '+20 150 0050392' }],
          directionsLabel: 'DIRECTIONS',
          directionsURL:
            'https://maps.google.com/?q=Skies+Plaza+New+Cairo+Egypt',
        },
      ],
      fields: [
        {
          name: 'code',
          type: 'text',
          required: true,
          admin: {
            description: '3-letter city code shown as a huge title (e.g. AMM, CAI).',
          },
        },
        {
          name: 'address',
          type: 'textarea',
          required: true,
          localized: true,
        },
        {
          name: 'phones',
          type: 'array',
          labels: { singular: 'Phone', plural: 'Phones' },
          fields: [
            { name: 'number', type: 'text', required: true },
          ],
        },
        {
          name: 'directionsLabel',
          type: 'text',
          localized: true,
          defaultValue: 'DIRECTIONS',
        },
        {
          name: 'directionsURL',
          type: 'text',
          admin: { description: 'Google Maps link.' },
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'gray-light',
      enumName: 'enum_al_bg_color',
      options: [
        { label: 'Gray Light (#f5f6f7)', value: 'gray-light' },
        { label: 'Brand Yellow Light', value: 'lev-yellow-light' },
        { label: 'Brand Blue Light', value: 'lev-blue-light' },
        { label: 'White', value: 'white' },
      ],
    },
  ],
}
