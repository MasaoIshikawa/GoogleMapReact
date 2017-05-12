const K_SIZE = 20;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  border: '5px solid red',
  borderRadius: K_SIZE,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 8,
  lineHeight: '20px',
  fontWeight: 'bold',
  padding: 4,
  cursor: 'pointer'
};

const greatPlaceStyleOk = {
  ...greatPlaceStyle,
  border: '5px solid green',
  color: '#3f51b5',
};

export {greatPlaceStyle, greatPlaceStyleOk, K_SIZE};
