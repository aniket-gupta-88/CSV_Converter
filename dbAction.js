const client = require('./dbconfig.js');

async function insertData(jsonArray) {
  try {
    await client.connect();

    const batchSize = 100; // Adjust the batch size as needed

    for (let i = 0; i < jsonArray.length; i += batchSize) {
      const batch = jsonArray.slice(i, i + batchSize);

      const queries = batch.map(data => {
        const { name, age, address, gender } = data;
        return {
          text: `
            INSERT INTO public.users ("name", age, address, additional_info)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
          `,
          values: [
            `${name.firstName} ${name.lastName}`,
            parseInt(age),
            JSON.stringify(address),
            JSON.stringify(gender)
          ]
        };
      });

      try {
        const results = await Promise.all(queries.map(query => client.query(query.text, query.values)));
        results.forEach(res => {
          console.log('Inserted:', res.rows[0]);
        });
      } catch (err) {
        console.error('Error inserting data:', err);
      }
    }

    const ageDistributionQuery = `
      SELECT
        CASE
          WHEN age < 20 THEN '< 20'
          WHEN age >= 20 AND age <= 40 THEN '20 to 40'
          WHEN age > 40 AND age <= 60 THEN '40 to 60'
          ELSE '> 60'
        END AS age_group,
        COUNT(*) AS count
      FROM
        public.users
      GROUP BY
        age_group
    `;

    const ageDistributionResult = await client.query(ageDistributionQuery);
    console.log('Age-Group % Distribution');
    
    ageDistributionResult.rows.forEach(row => {
      const percentage = Math.round((row.count / jsonArray.length) * 100);
      console.log(` |  ${row.age_group.padEnd(8)} | ${row.count.toString().padEnd(6)} | ${percentage.toString().padStart(3)}  |`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

module.exports = { insertData };
