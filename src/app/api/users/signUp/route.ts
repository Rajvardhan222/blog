import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { displayName, name, email, password } = reqBody;

    if (!(displayName && name && email && password)) {
      return NextResponse.json({
        error: "please provide all the fields",
      });
    }

    if (password.length < 4) {
      return NextResponse.json({
        error: "Password should be at least 4 characters long",
      });
    }

    let token = bcrypt.hashSync(password, 10);
    console.log(password,token);
    
    const user = await User.create({
      displayName,
      name,
      email,
      password: token,
    });

    if (!user) {
      return NextResponse.json({
        error: "Failed to create the user account",
      });
    }

   let userDetail = await User.findByPk(user.id, { attributes: { exclude: ["password"] } });

    return NextResponse.json({
      user: userDetail,
      success : true,
      statusCode: 201,
    });
  } catch (error: any) {
    console.log("Error in User routes", error);
    return NextResponse.json({
      error: "Something went wrong while creating the user account",
      errorMessage: error.message,
      statusCode: 500,
    });
  }
};
