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

INSERT INTO rzeczy_wykorzystane_do_seansu(seans_id, rzecz_id, uzyta_ilosc) VALUES (zwroc_id_seansu('masaż tajski'),zwroc_rzecz_id('czekolada'),5);
INSERT INTO rzeczy_wykorzystane_do_seansu(seans_id, rzecz_id, uzyta_ilosc) VALUES (zwroc_id_seansu('masaż tajski'),zwroc_rzecz_id('olejek kokosowy'),10);
INSERT INTO rzeczy_wykorzystane_do_seansu(seans_id, rzecz_id, uzyta_ilosc) VALUES (zwroc_id_seansu('masaż gorącymi kamieniami'),zwroc_rzecz_id('olejek kokosowy'),4);

INSERT INTO wynagrodzenie(kwota) VALUES (1000);
INSERT INTO wynagrodzenie(kwota) VALUES (2000);
INSERT INTO wynagrodzenie(kwota) VALUES (3000);

INSERT INTO pracownik(seans_id, wynagrodzenie_id, imie, nazwisko, stanowisko) VALUES (zwroc_id_seansu('masaż tajski'),zwroc_wynagrodzenie_id(1000),'Roman', 'Konopka', 'masażysta');
INSERT INTO pracownik(seans_id, wynagrodzenie_id, imie, nazwisko, stanowisko) VALUES (zwroc_id_seansu('masaż gorącymi kamieniami'),zwroc_wynagrodzenie_id(3000),'Adam', 'Nowak', 'masażysta');
INSERT INTO pracownik(seans_id, wynagrodzenie_id, imie, nazwisko, stanowisko) VALUES (zwroc_id_seansu('masaż tajski'),zwroc_wynagrodzenie_id(1000),'Kacper', 'Bal', 'masażysta');
INSERT INTO pracownik(seans_id, wynagrodzenie_id, imie, nazwisko, stanowisko) VALUES (zwroc_id_seansu('masaż tajski'),zwroc_wynagrodzenie_id(3000),'Kinga', 'Krzem', 'fizjoterapeuta');
INSERT INTO pracownik(seans_id, wynagrodzenie_id, imie, nazwisko, stanowisko) VALUES (zwroc_id_seansu('bicze wodne'),zwroc_wynagrodzenie_id(3000),'Kinga', 'Wiejska', 'ratownik');

INSERT INTO kurs(nazwa, poziom_luksusu) VALUES ('brazylijskie jambo', 1);
INSERT INTO kurs(nazwa, poziom_luksusu) VALUES ('wicher poranka', 2);
INSERT INTO kurs(nazwa, poziom_luksusu) VALUES ('meksykanskie bueno', 3);

INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (zwroc_kurs_id('brazylijskie jambo'),zwroc_id_seansu('masaż tajski'),zwroc_id_pracownika('Roman', 'Konopka', 'masażysta',1000));
INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (zwroc_kurs_id('brazylijskie jambo'),zwroc_id_seansu('masaż gorącymi kamieniami'),zwroc_id_pracownika('Adam', 'Nowak', 'masażysta',2500));
INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (zwroc_kurs_id('brazylijskie jambo'),zwroc_id_seansu('masaż czekoladą'),zwroc_id_pracownika('Kacper', 'Bal', 'masażysta',1000));
INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (zwroc_kurs_id('brazylijskie jambo'),zwroc_id_seansu('masaż eukaliptusem'),zwroc_id_pracownika('Kacper', 'Bal', 'masażysta',1000));
INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (zwroc_kurs_id('brazylijskie jambo'),zwroc_id_seansu('sauna finska'),zwroc_id_pracownika('Kinga', 'Wiejska', 'ratownik',2500));
INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (zwroc_kurs_id('wicher poranka'),zwroc_id_seansu('bicze wodne'),zwroc_id_seansu('masaż tajski'),zwroc_id_pracownika('Roman', 'Konopka', 'masażysta',1000));
-- INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (zwroc_kurs_id('wicher poranka'),4,1);
-- INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (zwroc_kurs_id('wicher poranka'),3,2);

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


INSERT INTO klient_kurs(klient_id, kurs_id, data_id) VALUES (zwroc_klient_id('Jan', 'Kowalski'),zwroc_kurs_id('brazylijskie jambo'),zwroc_data_id('01-01-2020'));
INSERT INTO klient_kurs(klient_id, kurs_id, data_id) VALUES (zwroc_klient_id('Jan', 'Kowalski'),zwroc_kurs_id('wicher poranka'),zwroc_data_id('02-01-2020'));
INSERT INTO klient_kurs(klient_id, kurs_id, data_id) VALUES (zwroc_klient_id('Jan', 'Kowalski'),zwroc_kurs_id('brazylijskie jambo'),zwroc_data_id('03-01-2020'));
INSERT INTO klient_kurs(klient_id, kurs_id, data_id) VALUES (zwroc_klient_id('Jan', 'Kowalski'),zwroc_kurs_id('brazylijskie jambo'),zwroc_data_id('07-01-2020'));
INSERT INTO klient_kurs(klient_id, kurs_id, data_id) VALUES (zwroc_klient_id('Dorota', 'Cynk'),zwroc_kurs_id('wicher poranka'),zwroc_data_id('06-01-2020'));
INSERT INTO klient_kurs(klient_id, kurs_id, data_id) VALUES (zwroc_klient_id('Dorota', 'Cynk'),zwroc_kurs_id('wicher poranka'),zwroc_data_id('01-01-2020'));
INSERT INTO klient_kurs(klient_id, kurs_id, data_id) VALUES (zwroc_klient_id('Benjamin', 'Cynk'),zwroc_kurs_id('wicher poranka'),zwroc_data_id('01-01-2020'));
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