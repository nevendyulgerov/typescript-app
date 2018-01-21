
export const render = (html: string, $target: {innerHTML: string}) => {
  $target.innerHTML = html;
};
