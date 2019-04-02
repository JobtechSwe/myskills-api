export const renameProp = (
  oldProp: string,
  newProp: string,
  { [oldProp]: old, ...others }: any
) =>
  old
    ? {
        ...others,
        [newProp]: old,
      }
    : { ...others }
