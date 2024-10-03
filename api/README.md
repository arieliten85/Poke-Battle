## API Description

This API allows you to manage and conduct battles between Pokémon. Below are the main functionalities of the application:

1. **Database Migrations**:
   - By running `npm run migration:run`, the necessary migrations will be executed to create the tables in the database, including the table that stores Pokémon information. This table will be automatically populated with initial Pokémon data for use in the application.

2. **List Pokémon**:
   - The API provides an endpoint that allows you to list all available Pokémon in the database. This endpoint returns relevant information about each Pokémon, such as its name, type, and stats.

3. **Pokémon Battles**:
   - It implements an endpoint that enables battles between Pokémon. Users can choose two Pokémon to face off, and the system determines the winner based on their stats and types.

4. **Battle Results**:
   - After each battle, the results are saved in a specific table in the database. This allows for keeping a record of all battles conducted, including details such as the Pokémon involved, the result, and the date of the battle.


## INSTRUCTIONS

### 1. Run Migrations

```bash
npm run migration:run

```
## 2. Start the database

```bash
npm run start:dev

```
