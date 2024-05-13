import { model, Schema } from 'mongoose';

const NavbarItemSchema = new Schema(
  {
    nameNav: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: null,
    },
  },
  { versionKey: false },
);

const NavbarItem = model('NavbarItem', NavbarItemSchema);
export default NavbarItem;
