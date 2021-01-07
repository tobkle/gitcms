import slugify from 'slugify';

export function getSlug(_title: string): string {
  return slugify(_title, {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: false, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: 'de', // language code of the locale to use
  });
}
