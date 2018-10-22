SOURCE_DATASET=hx-trial:michael__smith__user2
TARGET_DATASET=hx-data-production:collector__streaming

for TABLE in `bq ls $SOURCE_DATASET | tail +3 | cut -c 1-35| sed 's; ;;g'`
do
  echo $TABLE
  # Ignore descriptions for now, as there are some non-critical changes that have occurred slowly over time
  bq show --schema $SOURCE_DATASET.$TABLE |  python -m json.tool | sed 's; (Dereferenced);;g'  | fgrep -v '"description":' > SOURCE/$TABLE
  bq show --schema $TARGET_DATASET.$TABLE |  python -m json.tool | sed 's; (Dereferenced);;g' | fgrep -v '"description":'  > TARGET/$TABLE
done

echo "Generated pretty schemas in SOURCE and TARGET, use diff or an IDE to review differences"
