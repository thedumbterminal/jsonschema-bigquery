Useful for QA comparison of generated tables.

Review and run create_tables.sh. For example it can be useful to recreate tables in a new dataset.

Once run the tablediff.sh script (again review for config), can generate actual vs expected gbq schema files (from gbq itself).
These can then be used in combination with a diff tool to highlight any differences with the expected outputs.
