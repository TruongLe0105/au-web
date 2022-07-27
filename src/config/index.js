export const NFT_ADDRESS = process.env.REACT_APP_NFT_ADDRESS;
export const LAUNCHPAD_ADDRESS = process.env.REACT_APP_LAUNCHPAD_ADDRESS;
export const BUSD_TOKEN_ADDRESS = process.env.REACT_APP_BUSD_TOKEN_ADDRESS;

export const IMAGE_BY_LEVEL = {
  1: "/images/package1.png",
  2: "/images/package2.png",
  3: "/images/package4.png",
  4: "/images/package5.png",
  5: "/images/package3.png",
};

export const levelBackgroundMapping = (level) => {
  switch (level) {
    case 1:
      return "radial-gradient(#474242, #2a0100, #4f0101)";
    case 2:
      return "radial-gradient(#474242,#1d1b1a,#1d1c1a)";
    case 3:
      return "radial-gradient(rgb(71, 66, 66), rgb(1 57 0), rgb(29, 28, 26))";
    case 4:
      return "radial-gradient(rgb(128 119 113), rgb(193 147 0), rgb(146 113 0))";

    case 5:
      return "radial-gradient(rgb(71, 66, 66), rgb(0 27 54), rgb(29, 28, 26))";

    default:
      break;
  }
};

export const levelNameMapping = (level) => {
  switch (+level) {
    case 1:
      return "Cheese";
    case 2:
      return "Opener";
    case 3:
      return "Wine Glass";

    case 4:
      return "Wine Oak";

    case 5:
      return "Romanée Conti";

    default:
      break;
  }
};

export const levelDescriptionMapping = (level) => {
  switch (+level) {
    case 1:
      return `The color of the background is inspired by the label of Jonnie Walker Whisky. Cheese NFT is presented for a specialist who knows exactly what is mixed with wine will make your taste explode`;
    case 2:
      return "The color of the background is inspired by the label of Jonnie Walker Whisky. NFT Opener is presented for a wine taster who knows all about wine all over the world but gives you a taste of just what the doctor ordered";
    case 3:
      return "The color of the background is inspired by the label of Jonnie Walker Whisky. NFT Wine Glass is presented for a wine lover who knows which kinds of wine will match your emotion, be a sense friend whenever you need";

    case 4:
      return "The color of the background is inspired by the label of Jonnie Walker Whisky. NFT Wine Oak is presented for a cellar owner who gives all kindness to wine and makes them become their best status ever";

    case 5:
      return "The color of the background is inspired by the label of Jonnie Walker Whisky. NFT Romanée Conti is presented for a wine collector who is touched by wine and understands how wine is worth, collect them by all means";

    default:
      break;
  }
};

export const formatId = (id) => {
  const newId = id.toString();
  if (newId.length == 1) {
    return `0000${id}`;
  }

  if (newId.length == 2) {
    return `000${id}`;
  }
  if (newId.length == 3) {
    return `00${id}`;
  }
  if (newId.length == 4) {
    return `0${id}`;
  }

  return `${id}`;
};

export const formatTotalCoin = (num) => {
  let dollarUSLocale = Intl.NumberFormat("en-US");

  return dollarUSLocale.format(num);
};

export const hiddenAddress = (address) => {
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
};

export const getTime = (now) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${
    monthNames[now.getMonth()]
  } ${now.getDate()}, ${now.getFullYear()}, ${now.getHours()}:${
    now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()
  }`;
};