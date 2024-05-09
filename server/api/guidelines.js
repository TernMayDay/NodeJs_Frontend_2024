export default defineEventHandler(() => {
  const fontData = [
    {
      class: 'text-h1',
      name: 'headline 1',
      weight: 'Bold',
      size: '56px',
      lineHeight: '120%',
      letterSpacing: '4px'
    },
    {
      class: 'text-h2',
      name: 'headline 2',
      weight: 'Bold',
      size: '40px',
      lineHeight: '120%',
      letterSpacing: '4px'
    },
    {
      class: 'text-h3',
      name: 'headline 3',
      weight: 'Bold',
      size: '24px',
      lineHeight: '120%',
      letterSpacing: '2px'
    },
    {
      class: 'text-h4',
      name: 'headline 4',
      weight: 'Medium',
      size: '18px',
      lineHeight: '120%',
      letterSpacing: '2px'
    },
    {
      class: 'text-btn1',
      name: 'btn 1',
      weight: 'Medium',
      size: '16px',
      lineHeight: '150%',
      letterSpacing: '2px'
    },
    {
      class: 'text-btn2',
      name: 'btn 2',
      weight: 'Medium',
      size: '14px',
      lineHeight: '150%',
      letterSpacing: '2px'
    },
    {
      class: 'text-base',
      name: 'body',
      weight: 'Regular',
      size: '16px',
      lineHeight: '150%',
      letterSpacing: '2px'
    },
    {
      class: 'text-s1',
      name: 'small 1',
      weight: 'Regular',
      size: '14px',
      lineHeight: '150%',
      letterSpacing: '1px'
    },
    {
      class: 'text-s2',
      name: 'small 2',
      weight: 'Regular',
      size: '12px',
      lineHeight: '150%',
      letterSpacing: '1px'
    }
  ]
  const engData = [
    {
      class: 'text-eng1',
      name: 'english 1',
      weight: 'Light',
      size: '42px',
      lineHeight: '120%',
      letterSpacing: '0px'
    },
    {
      class: 'text-eng2',
      name: 'english 2',
      weight: 'Light',
      size: '32px',
      lineHeight: '120%',
      letterSpacing: '0px'
    },
    {
      class: 'text-eng3',
      name: 'english 3',
      weight: 'Light',
      size: '24px',
      lineHeight: '120%',
      letterSpacing: '0px'
    }
  ]
  return { fontData, engData }
})
