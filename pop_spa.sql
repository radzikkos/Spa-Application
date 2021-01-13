INSERT INTO cena_rzeczy(cena_pojedynczej_sztuki) VALUES (4); 
INSERT INTO cena_rzeczy(cena_pojedynczej_sztuki) VALUES (2); 

INSERT INTO rzecz(cena_id, nazwa, ilosc) VALUES (1,'czekolada',10); 
INSERT INTO rzecz(cena_id, nazwa, ilosc) VALUES (2,'olejek kokosowy',100); 
INSERT INTO rzecz(cena_id, nazwa, ilosc) VALUES (zwroc_id_ceny(4),'olejek bambusowy',100); 


INSERT INTO pomieszczenie VALUES (1); 
INSERT INTO pomieszczenie VALUES (2); 

INSERT INTO seans(pomieszczenie_id, rodzaj, czas_trwania ) VALUES (1,'masaż tajski', 45); 
INSERT INTO seans(pomieszczenie_id, rodzaj, czas_trwania ) VALUES (1,'masaż gorącymi kamieniami', 45); 
INSERT INTO seans(pomieszczenie_id, rodzaj, czas_trwania ) VALUES (2,'masaż czekoladą', 45); 
INSERT INTO seans(pomieszczenie_id, rodzaj, czas_trwania ) VALUES (2,'masaż eukaliptusem', 45); 
INSERT INTO seans(pomieszczenie_id, rodzaj, czas_trwania ) VALUES (2,'bicze wodne', 45); 
INSERT INTO seans(pomieszczenie_id, rodzaj, czas_trwania ) VALUES (2,'sauna finska', 20); 

INSERT INTO rzeczy_wykorzystane_do_seansu(seans_id, rzecz_id, uzyta_ilosc) VALUES (1,1,5);
INSERT INTO rzeczy_wykorzystane_do_seansu(seans_id, rzecz_id, uzyta_ilosc) VALUES (1,2,10);
INSERT INTO rzeczy_wykorzystane_do_seansu(seans_id, rzecz_id, uzyta_ilosc) VALUES (2,2,4);

INSERT INTO wynagrodzenie(kwota) VALUES (1000);
INSERT INTO wynagrodzenie(kwota) VALUES (2000);
INSERT INTO wynagrodzenie(kwota) VALUES (3000);

INSERT INTO pracownik(seans_id, wynagrodzenie_id, imie, nazwisko, stanowisko) VALUES (1,1,'Roman', 'Konopka', 'masażysta');
INSERT INTO pracownik(seans_id, wynagrodzenie_id, imie, nazwisko, stanowisko) VALUES (2,3,'Adam', 'Nowak', 'masażysta');
INSERT INTO pracownik(seans_id, wynagrodzenie_id, imie, nazwisko, stanowisko) VALUES (1,1,'Kacper', 'Bal', 'masażysta');
INSERT INTO pracownik(seans_id, wynagrodzenie_id, imie, nazwisko, stanowisko) VALUES (1,3,'Kinga', 'Krzem', 'fizjoterapeuta');
INSERT INTO pracownik(seans_id, wynagrodzenie_id, imie, nazwisko, stanowisko) VALUES (5,3,'Kinga', 'Wiejska', 'ratownik');

INSERT INTO kurs(nazwa, poziom_luksusu) VALUES ('brazylijskie jambo', 1);
INSERT INTO kurs(nazwa, poziom_luksusu) VALUES ('wicher poranka', 2);
INSERT INTO kurs(nazwa, poziom_luksusu) VALUES ('meksykanskie bueno', 3);

INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (1,1,1);
INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (1,2,2);
INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (1,3,3);
INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (1,4,3);
INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (1,5,5);
INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (2,1,1);
INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (2,4,1);
INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (2,3,2);

INSERT INTO data(data) VALUES ('01-01-2020');
INSERT INTO data(data) VALUES ('02-01-2020');
INSERT INTO data(data) VALUES ('03-01-2020');
INSERT INTO data(data) VALUES ('04-01-2020');
INSERT INTO data(data) VALUES ('05-01-2020');
INSERT INTO data(data) VALUES ('06-01-2020');
INSERT INTO data(data) VALUES ('07-01-2020');
INSERT INTO data(data) VALUES ('08-01-2020');
INSERT INTO data(data) VALUES ('09-01-2020');
INSERT INTO data(data) VALUES ('10-01-2020');

INSERT INTO klient(imie, nazwisko, pesel) VALUES ('Jan', 'Kowalski', '12345678901');
INSERT INTO klient(imie, nazwisko, pesel) VALUES ('Dorota', 'Cynk', '12345678902');
INSERT INTO klient(imie, nazwisko, pesel) VALUES ('Benjamin', 'Cynk', '12345678903');
INSERT INTO klient(imie, nazwisko, pesel) VALUES ('Beata', 'BAT', '12345678904');


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
drop table klient_kurs cascade;
drop table klient cascade;