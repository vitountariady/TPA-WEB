package service

import (
	"fmt"

	"gopkg.in/gomail.v2"
)

func sendEmail(userEmail string, link string) {
	mail := gomail.NewMessage()

	mail.SetHeader("From", "sky.xii.a.27.vito@gmail.com")
	mail.SetHeader("To", userEmail)
	mail.SetHeader("Subject", "LinkhedIn Account Activation")
	mail.SetBody("text/html", "To Activate your LinkhedIn account, click the following link: "+link)

	dial := gomail.NewDialer("smtp.gmail.com", 587, "sky.xii.a.27.vito@gmail.com", "mfohmugekbeamtvw")

	err := dial.DialAndSend(mail)

	if err != nil {
		fmt.Println(err)
		panic(err)
	}
}
func resetPassEmail(userEmail string, link string) {
	mail := gomail.NewMessage()

	mail.SetHeader("From", "sky.xii.a.27.vito@gmail.com")
	mail.SetHeader("To", userEmail)
	mail.SetHeader("Subject", "LinkhedIn Password Reset Link")
	mail.SetBody("text/html", "To Reset LinkhedIn account password, click the following link: "+link)

	dial := gomail.NewDialer("smtp.gmail.com", 587, "sky.xii.a.27.vito@gmail.com", "mfohmugekbeamtvw")

	err := dial.DialAndSend(mail)

	if err != nil {
		fmt.Println(err)
		panic(err)
	}
}
