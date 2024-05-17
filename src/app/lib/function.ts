export function convertNum (str: string): number {
  const result = Number(
    str
      .replace(/¥/, '')
      .replace(/,/g, '')
      .replace(/円/, '')
      .replace(/（税 \d+ 円）/, '')
      .replace(/（税込 \d+ 円）/, '')
      .trim()
  )
  return result
}

// 通貨に戻す
export function convertToCurrency (num: string): string {
  const str = num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
  return str !== '' ? '¥' + str : ''
}

// 通貨から戻す
export function convertFromCurrency (num: string): string {
  let temp = num.replace('¥', '')
  temp = temp.replace(',', '')
  temp = temp.replace(' ', '')
  return temp
}

export function convertStringToDate (dateString: string): Date | null {
  // 正規表現を使って文字列が指定されたフォーマットに従っているかをチェック
  const regex = /^\d{4}\.\d{2}\.\d{2}（[日月火水木金土]）\d{2}:\d{2}$/
  if (!regex.test(dateString)) {
    console.error('Invalid date format.')
    return null
  }
  // 年月日と時刻を分割
  const [datePart, timePart] = dateString.split(/（.）/)
  // 年月日の各要素を取得
  const [year, month, day] = datePart.split('.').map(Number)
  // 時刻の各要素を取得
  const [hour, minute] = timePart.split(':').map(Number)
  // Dateオブジェクトを生成して返す
  return new Date(year, month - 1, day, hour, minute)
}

export function authError (code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return '無効なメールアドレスです'
    case 'auth/missing-password':
      return 'パスワードを入力してください'
    case 'auth/invalid-credential':
      return 'メールアドレスまたはパスワードが間違っています'
    case 'auth/weak-password':
      return 'パスワードが弱すぎます'
    case 'auth/email-already-in-use':
      return 'このメールアドレスは既に使用されています'
    default:
      return code
  }
}
