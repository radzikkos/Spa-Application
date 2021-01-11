INSERT INTO cena_rzeczy VALUES (1,1); 
INSERT INTO cena_rzeczy VALUES (2,2); 

INSERT INTO rzecz VALUES (1,1,'czekolada',10); 
INSERT INTO rzecz VALUES (2,2,'olejek kokosowy',100); 

INSERT INTO pomieszczenie VALUES (1); 
INSERT INTO pomieszczenie VALUES (2); 

INSERT INTO seans VALUES (1,1,'masaż tajski', 45); 
INSERT INTO seans VALUES (2,1,'masaż gorącymi kamieniami', 45); 
INSERT INTO seans VALUES (3,2,'masaż czekoladą', 45); 
INSERT INTO seans VALUES (4,2,'masaż eukaliptusem', 45); 
INSERT INTO seans VALUES (5,2,'bicze wodne', 45); 

INSERT INTO rzeczy_wykorzystane_do_seansu(seans_id, rzecz_id, uzyta_ilosc) VALUES (1,1,5);
INSERT INTO rzeczy_wykorzystane_do_seansu VALUES (1,2,10);
INSERT INTO rzeczy_wykorzystane_do_seansu VALUES (2,2,4);

INSERT INTO wynagrodzenie VALUES (1,1000);
INSERT INTO wynagrodzenie VALUES (2,2000);
INSERT INTO wynagrodzenie VALUES (3,3000);

INSERT INTO pracownik(seans_id, wynagrodzenie_id, imie, nazwisko, stanowisko) VALUES (1,1,'Roman', 'Konopka', 'masażysta');
INSERT INTO pracownik(seans_id, wynagrodzenie_id, imie, nazwisko, stanowisko) VALUES (2,3,'Adam', 'Nowak', 'masażysta');
INSERT INTO pracownik(seans_id, wynagrodzenie_id, imie, nazwisko, stanowisko) VALUES (1,1,'Kacper', 'Bal', 'masażysta');
INSERT INTO pracownik(seans_id, wynagrodzenie_id, imie, nazwisko, stanowisko) VALUES (1,3,'Kinga', 'Krzem', 'fizjoterapeuta');
INSERT INTO pracownik(seans_id, wynagrodzenie_id, imie, nazwisko, stanowisko) VALUES (5,3,'Kinga', 'Wiejska', 'ratownik');

INSERT INTO kurs(nazwa, poziom_luksusu) VALUES ('brazylijskie jambo', 1);
INSERT INTO kurs(nazwa, poziom_luksusu) VALUES ('wicher poranka', 2);

INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (1,1,1);
INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (1,2,2);
INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (1,3,3);
INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (1,4,3);
INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (1,5,5);
INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (2,1,1);
INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (2,4,1);
INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (2,3,2);

INSERT INTO data(data) VALUES ('1-1-2020');
INSERT INTO data(data) VALUES ('2-1-2020');
INSERT INTO data(data) VALUES ('3-1-2020');
INSERT INTO data(data) VALUES ('4-1-2020');
INSERT INTO data(data) VALUES ('5-1-2020');
INSERT INTO data(data) VALUES ('6-1-2020');
INSERT INTO data(data) VALUES ('7-1-2020');
INSERT INTO data(data) VALUES ('8-1-2020');
INSERT INTO data(data) VALUES ('9-1-2020');

INSERT INTO klient(imie, nazwisko, pesel) VALUES ('Jan', 'Kowalski', '12345678901');
INSERT INTO klient(imie, nazwisko, pesel) VALUES ('Dorota', 'Cynk', '12345678902');
INSERT INTO klient(imie, nazwisko, pesel) VALUES ('Benjamin', 'Cynk', '12345678903');


INSERT INTO klient_kurs(klient_id, kurs_id, data_id) VALUES (1,1,1);
INSERT INTO klient_kurs(klient_id, kurs_id, data_id) VALUES (1,2,2);
INSERT INTO klient_kurs(klient_id, kurs_id, data_id) VALUES (1,1,3);
INSERT INTO klient_kurs(klient_id, kurs_id, data_id) VALUES (1,1,7);
INSERT INTO klient_kurs(klient_id, kurs_id, data_id) VALUES (2,2,6);
INSERT INTO klient_kurs(klient_id, kurs_id, data_id) VALUES (2,2,1);
INSERT INTO klient_kurs(klient_id, kurs_id, data_id) VALUES (3,2,1);
/*Drop*/
DROP TABLE KLIENT CASCADE;
DROP TABLE DATA CASCADE;
DROP TABLE kurs_seans CASCADE;
drop table pracownik ;
drop table rzeczy_wykorzystane_do_seansu CASCADE; 
drop table rzecz CASCADE;
drop table cena_rzeczy CASCADE;
drop table seans CASCADE;
drop table pomieszczenie CASCADE;
drop table wynagrodzenie CASCADE;
drop table kurs CASCADE;