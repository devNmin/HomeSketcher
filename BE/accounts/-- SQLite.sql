-- SQLite
DELETE FROM accounts_user WHERE user_email = 'testemail';
INSERT INTO accounts_user ( user_email, user_password, user_nickname, user_gender, user_name, user_color, user_style)
VALUES ('testemail', 'testpw','test',0,'name','stye','color');